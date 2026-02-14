
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());



// 混淆项词库池
const DISTRACTOR_POOL = [
    "[n.] 时间; 时刻; 次; 回",
    "[n.] 人; 个人; 人物",
    "[n.] 年; 年份; 岁",
    "[n.] 方式; 方法; 道路",
    "[n.] 日; 天; 白天",
    "[n.] 男人; 人类; 丈夫",
    "[n.] 政府; 政体; 管辖",
    "[n.] 工作; 职业; 事情",
    "[n.] 生活; 生命; 生计",
    "[n.] 情况; 案例; 箱",
    "[v.] 说; 讲; 谈论",
    "[v.] 获得; 得到; 变得",
    "[v.] 制造; 做; 使得",
    "[v.] 知道; 了解; 认识",
    "[v.] 思考; 想; 认为",
    "[v.] 来; 来到; 变成",
    "[v.] 看见; 观看; 领会",
    "[v.] 想要; 希望; 需要",
    "[v.] 寻找; 查找; 看着",
    "[v.] 使用; 利用; 应用",
    "[adj.] 好的; 优良的; 愉快的",
    "[adj.] 新的; 新鲜的; 更新的",
    "[adj.] 第一的; 最早的; 首要的",
    "[adj.] 最后的; 末尾的; 上一次的",
    "[adj.] 长久的; 长的; 远的",
    "[adj.] 伟大的; 重大的; 极好的",
    "[adj.] 小的; 少许的; 琐碎的",
    "[adj.] 自己的; 特有的; 拥有的",
    "[adj.] 其他的; 另外的; 不同的",
    "[adj.] 老的; 古老的; 年长的",
    "[adv.] 现在; 目前; 立刻",
    "[adv.] 甚至; 即使; 连",
    "[adv.] 仅仅; 只是; 刚才",
    "[adv.] 也; 同样; 而且",
    "[adv.] 此时; 当时; 然后",
    "[prep.] 在...里; 在...期间",
    "[prep.] 在...之上; 关于",
    "[prep.] 与; 和; 随着",
    "[prep.] 属于; 关于; ...的",
    "[prep.] 向; 朝; 位于",
    "[n.] 问题; 疑问; 询问",
    "[n.] 朋友; 友人; 伙伴",
    "[n.] 钱; 货币; 财富",
    "[n.] 事实; 真相; 实际",
    "[n.] 国家; 州; 状态",
    "[v.] 感觉; 觉得; 触摸",
    "[v.] 尝试; 试图; 试验",
    "[v.] 离开; 留下; 遗忘",
    "[v.] 呼叫; 打电话; 称呼",
    "[v.] 询问; 请求; 邀请"
];

app.get('/api/distractors', (req, res) => {
    try {
        const count = parseInt(req.query.count) || 3;
        const shuffled = [...DISTRACTOR_POOL].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        res.json(selected);
    } catch (error) {
        console.error('Distractor generation error:', error);
        res.status(500).json({ error: 'Failed to generate distractors' });
    }
});



app.get('/api/translate', async (req, res) => {
    const word = req.query.word;
    if (!word) {
        return res.status(400).json({ error: 'Word is required' });
    }

    try {
        const url = `https://cn.bing.com/dict/search?q=${encodeURIComponent(word)}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(response.data);
        const result = {
            word: word,
            phonetic_us: '',
            phonetic_uk: '',
            definitions: [],
            examples: []
        };

        // Extract phonetics
        let usPhonetic = $('.hd_prUS').text().replace('美', '').trim();
        let ukPhonetic = $('.hd_prUK').text().replace('英', '').trim();

        // Fallback: Sometimes Bing uses different classes or just one .hd_pr
        if (!usPhonetic && !ukPhonetic) {
            const pr = $('.hd_pr');
            if (pr.length > 0) {
                // If there's just one, it might be the general phonetic
                usPhonetic = pr.text().trim(); 
            }
        }
        
        result.phonetic_us = usPhonetic;
        result.phonetic_uk = ukPhonetic;

        // Extract definitions
        $('.qdef > ul > li').each((i, el) => {
            const pos = $(el).find('.pos').text();
            const def = $(el).find('.def').text();
            if (pos && def) {
                result.definitions.push({ pos, def });
            }
        });

        // Fallback for definitions if standard structure fails (sometimes Bing layout differs)
        if (result.definitions.length === 0) {
             $('.qdef .def_row').each((i, el) => {
                 // Alternate structure
                 const pos = $(el).find('.pos').text();
                 const def = $(el).find('.def').text();
                 if (def) {
                    result.definitions.push({ pos: pos || '常用', def });
                 }
             });
        }

        // Extract examples
        $('#sentenceSeg .se_li').each((i, el) => {
            if (i >= 3) return; // Limit to 3 examples
            const en = $(el).find('.sen_en').text().trim();
            const cn = $(el).find('.sen_cn').text().trim();
            if (en && cn) {
                result.examples.push({ en, cn });
            }
        });

        // Extract Collocations (搭配)
        // Usually in #colid or .col_fl
        const collocations = [];
        $('#colid .df_div .df_li').each((i, el) => {
             if (i >= 5) return;
             collocations.push($(el).text().trim());
        });
        // Fallback for some layouts
        if (collocations.length === 0) {
            $('.col_fl .col_div').each((i, el) => {
                 if (i >= 5) return;
                 const text = $(el).text().trim();
                 if (text) collocations.push(text);
            });
        }
        result.collocations = collocations;

        // Extract Idioms (短语)
        // Usually in #phrase or .idm_s
        const idioms = [];
        $('#phrase .dis').each((i, el) => {
             if (i >= 3) return;
             const phrase = $(el).find('.p1_b').text().trim();
             const meaning = $(el).find('.p1_def').text().trim();
             if (phrase && meaning) {
                 idioms.push(`${phrase}: ${meaning}`);
             }
        });
        // Fallback or generic idm list
        if (idioms.length === 0) {
            $('.idm_s .idm_l').each((i, el) => {
                if (i >= 3) return;
                const text = $(el).text().trim().replace(/\s+/g, ' ');
                if (text) idioms.push(text);
            });
        }
        result.idioms = idioms;

        res.json(result);
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Failed to fetch translation' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
