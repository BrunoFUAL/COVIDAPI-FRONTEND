const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const { attr } = require("cheerio/lib/api/attributes");
const { response } = require("express");
const express = require("express");

const app = express();

const news = [
    {
        name: "World Health Organization",
        address:
            "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/media-resources/news",
        base: "https://www.who.int",
    },
    {
        name: "US News",
        address: "https://www.usnews.com/topics/subjects/coronavirus",
        base: "",
    },
    {
        name: "CBC",
        address: "https://www.cbc.ca/news",
        base: "https://www.cbc.ca",
    },
    {
        name: "The New York Times",
        address: "https://www.nytimes.com/section/health",
        base: "",
    },
    {
        name: "News Scientist",
        address: "https://www.newscientist.com/",
        base: "",
    },
    {
        name: "Devex",
        address: "https://www.devex.com/news/",
        base: "",
    },
    {
        name: "Sky News",
        address: "https://news.sky.com/topic/coronavirus-8483",
        base: "https://news.sky.com",
    },
    {
        name: "South China Morning Post",
        address: "https://www.scmp.com/coronavirus",
        base: "",
    },
    {
        name: "Times of India",
        address: "https://timesofindia.indiatimes.com/world",
        base: "",
    },
    {
        name: "Xinhuanet",
        address: "http://www.news.cn/english",
        base: "",
    },
    {
        name: "MSF",
        address: "https://www.msf.org",
        base: "https://www.msf.org",
    },
    {
        name: "Australian Government Department of Health",
        address: "https://www.health.gov.au/news",
        base: "https://www.health.gov.au/",
    },
    {
        name: "Global News",
        address: "https://globalnews.ca",
        base: "https://globalnews.ca/",
    },
    {
        name: "Reuters",
        address: "https://www.reuters.com/business",
        base: "",
    },
    {
        name: "Health Line",
        address: "https://www.healthline.com/health-news",
        base: "https://www.healthline.com",
    },
    {
        name: "ABC News",
        address: "https://abcnews.go.com/",
        base: "",
    },
];

const articles = [];

news.forEach((article) => {
    axios.get(article.address).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a:contains("COVID")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr("href");

            articles.push({
                title,
                url: article.base + url,
                source: article.name,
            });
        });
        res.json(articles);
    });
});

app.get("/", (req, res) => {
    res.json("Welcome to my Covid-19 News API");
});

app.get("/news", (req, res) => {
    res.json(articles);
});

app.get("/news/:articleId", async (req, res) => {
    const articleId = req.params.articleId;

    const articleAddress = news.filter((article) => article.name == articleId)[0]
        .address;
    const articleBase = news.filter((article) => article.name == articleId)[0]
        .base;

    axios
        .get(articleAddress)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const specificArticles = [];

            $('a:contains("COVID")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr("href");
                specificArticles.push({
                    title,
                    url: articleBase + url,
                    source: articleId,
                });
            });
            res.json(specificArticles);
        })
        .catch((err) => console.log(err));
});
app.listen(PORT, () => console.log("server running on PORT", PORT));
