const axios = require("axios")
const cheerio = require("cheerio")

const newspapers_en = [
    {
        name: 'CNA',
        address: 'https://www.channelnewsasia.com/topic/covid-19',
        base: 'https://www.channelnewsasia.com',
        tag_search: 'h6',
        className: 'h6 h6-- list-object__heading'
    },
    {
        name: 'ABC',
        address: 'https://www.abc.net.au/news/story-streams/coronavirus/',
        base: 'https://www.abc.net.au',
        tag_search: 'span',
        className: '_3UTrd'
    },
    {
        name: 'News Medical Life Sciences',
        address: 'https://www.news-medical.net/condition/Coronavirus-Disease-COVID-19',
        base: 'https://www.news-medical.net',
        tag_search: 'h3',
        className: null
    },
    {
        name: 'The New York Times',
        address: 'https://www.nytimes.com/search?dropmab=true&query=covid&sort=newest',
        base: 'https://www.nytimes.com',
        tag_search: 'div',
        className: 'css-e1lvw9'
    }
]

const newspapers_pt = [
    {
        name: 'Sapo',
        address: 'https://www.sapo.pt/noticias/covid19',
        base: '',
        tag_search: 'h6',
        className: '[ no-margin-bottom ] title'
    },
    {
        name: 'Notícias ao Minuto',
        address: 'https://www.noticiasaominuto.com/dossiers/coronavirus',
        base: '',
        tag_search: 'p',
        className: 'article-thumb-text'
    }
]

const newspapers_es = [
    {
        name: 'ABC',
        address: 'https://www.abc.es/hemeroteca/covid',
        base: '',
        tag_search: 'h2',
        className: null
    },
    {
        name: 'UltimaHora',
        address: 'https://www.ultimahora.com/covid-19-a41526.html',
        base: '',
        tag_search: 'h2',
        className: 'article-title'
    },
    {
        name: 'TeleMadrid',
        address: 'https://www.telemadrid.es/buscador/?text=covid',
        base: 'https://www.telemadrid.es',
        tag_search: 'h2',
        className: 'search-item__heading'
    }
]

const newspapers_it = [
    {
        name: 'LaStampa',
        address: 'https://www.lastampa.it/ricerca?query=covid',
        base: '',
        tag_search: 'h2',
        className: 'entry__title'
    },
    {
        name: 'adnKronos',
        address: 'https://www.adnkronos.com/search?searchText=covid&query=covid&words=all&sorting=-pubInfo.publicationTime&startDay=&startMonth=&startYear=&startDate=&endDay=&endMonth=&endYear=&endDate=&attributes.mainsection=%2F&filter=on',
        base: 'https://www.adnkronos.com',
        tag_search: 'h3',
        className: 'title'
    },
    {
        name: 'Il Messaggero',
        address: 'https://www.ilmessaggero.it/ricerca/covid/',
        base: '',
        tag_search: 'div',
        className: 'item_content'
    }
]

let articles_en = []

let articles_pt = []

let articles_es = []

let articles_it = []


newspapers_en.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) =>{
        const html = response.data;
        const $ = cheerio.load(html);
        
        $(newspaper.tag_search, html).each(function () {
            if($(this).attr('class') == newspaper.className){
                const sc = $(this).children('a').each(function() {

                    let title = '';
                    if($(this).attr('title') == null){
                        title = $(this).text().trim();
                    }else{
                        title = $(this).attr('title');
                    }
                    
                    const url = newspaper.base + $(this).attr('href');
       
                    articles_en.push({
                        title,
                        url: url,
                        source: newspaper.name
                    })    
                })
            }
        })
        
    }).catch((err) => console.log(err))

})

newspapers_pt.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) =>{
        const html = response.data;
        const $ = cheerio.load(html);
        
        $(newspaper.tag_search, html).each(function () {
            if($(this).attr('class') == newspaper.className){
                const sc = $(this).children('a').each(function() {

                    let title = '';
                    if($(this).attr('title') == null){
                        title = $(this).text().trim();
                    }else{
                        title = $(this).attr('title');
                    }
                    
                    const url = newspaper.base + $(this).attr('href');
       
                    articles_pt.push({
                        title,
                        url: url,
                        source: newspaper.name
                    })
                })
            }
        })
        
    }).catch((err) => console.log(err))

})

newspapers_es.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) =>{
        const html = response.data;
        const $ = cheerio.load(html);
        
        $(newspaper.tag_search, html).each(function () {
            if($(this).attr('class') == newspaper.className){
                const sc = $(this).children('a').each(function() {

                    let title = '';
                    if($(this).attr('title') == null){
                        title = $(this).text().trim();
                    }else{
                        title = $(this).attr('title');
                    }
                    
                    const url = newspaper.base + $(this).attr('href');
                    
                    articles_es.push({
                        title,
                        url: url,
                        source: newspaper.name
                    })
            
                })
            }
        })
        
    }).catch((err) => console.log(err))

})

newspapers_it.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) =>{
        const html = response.data;
        const $ = cheerio.load(html);
        
        $(newspaper.tag_search, html).each(function () {
            if($(this).attr('class') == newspaper.className){
                const sc = $(this).children('a').each(function() {

                    let title = '';
                    if($(this).attr('title') == null){
                        title = $(this).text().trim();
                    }else{
                        title = $(this).attr('title');
                    }
                    
                    const url = newspaper.base + $(this).attr('href');
       
                    articles_it.push({
                        title,
                        url: url,
                        source: newspaper.name
                    })

                })
            }
        })
        
    }).catch((err) => console.log(err))

})


exports.getNewEN = (req, res) => {
    res.json(articles_en)
}

exports.getNewPT = (req, res) => {
    res.json(articles_pt)
}

exports.getNewES = (req, res) => {
    res.json(articles_es)
}

exports.getNewIT = (req, res) => {
    res.json(articles_it)
}


setInterval(() => {

    articles_en = []
    newspapers_en.forEach(newspaper => {
        axios.get(newspaper.address)
        .then((response) =>{
            const html = response.data;
            const $ = cheerio.load(html);
            
            $(newspaper.tag_search, html).each(function () {
                if($(this).attr('class') == newspaper.className){
                    const sc = $(this).children('a').each(function() {
    
                        let title = '';
                        if($(this).attr('title') == null){
                            title = $(this).text().trim();
                        }else{
                            title = $(this).attr('title');
                        }
                        
                        const url = newspaper.base + $(this).attr('href');
           
                        articles_en.push({
                            title,
                            url: url,
                            source: newspaper.name
                        })    
                    })
                }
            })
            
        }).catch((err) => console.log(err))
    
    })
    
    articles_pt=[]
    newspapers_pt.forEach(newspaper => {
        axios.get(newspaper.address)
        .then((response) =>{
            const html = response.data;
            const $ = cheerio.load(html);
            
            $(newspaper.tag_search, html).each(function () {
                if($(this).attr('class') == newspaper.className){
                    const sc = $(this).children('a').each(function() {
    
                        let title = '';
                        if($(this).attr('title') == null){
                            title = $(this).text().trim();
                        }else{
                            title = $(this).attr('title');
                        }
                        
                        const url = newspaper.base + $(this).attr('href');
           
                        articles_pt.push({
                            title,
                            url: url,
                            source: newspaper.name
                        })
                    })
                }
            })
            
        }).catch((err) => console.log(err))
    
    })
    
    articles_es=[]
    newspapers_es.forEach(newspaper => {
        axios.get(newspaper.address)
        .then((response) =>{
            const html = response.data;
            const $ = cheerio.load(html);
            
            $(newspaper.tag_search, html).each(function () {
                if($(this).attr('class') == newspaper.className){
                    const sc = $(this).children('a').each(function() {
    
                        let title = '';
                        if($(this).attr('title') == null){
                            title = $(this).text().trim();
                        }else{
                            title = $(this).attr('title');
                        }
                        
                        const url = newspaper.base + $(this).attr('href');
                        
                        articles_es.push({
                            title,
                            url: url,
                            source: newspaper.name
                        })
                
                    })
                }
            })
            
        }).catch((err) => console.log(err))
    
    })
    
    articles_it=[]
    newspapers_it.forEach(newspaper => {
        axios.get(newspaper.address)
        .then((response) =>{
            const html = response.data;
            const $ = cheerio.load(html);
            
            $(newspaper.tag_search, html).each(function () {
                if($(this).attr('class') == newspaper.className){
                    const sc = $(this).children('a').each(function() {
    
                        let title = '';
                        if($(this).attr('title') == null){
                            title = $(this).text().trim();
                        }else{
                            title = $(this).attr('title');
                        }
                        
                        const url = newspaper.base + $(this).attr('href');
           
                        articles_it.push({
                            title,
                            url: url,
                            source: newspaper.name
                        })
    
                    })
                }
            })
            
        }).catch((err) => console.log(err))
    
    })
    
},300000);