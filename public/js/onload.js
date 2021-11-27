window.onload = () => {
    (async () => {
        var selected = '';
        var ele = document.getElementsByName('btnradio');

        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked){
            selected = ele[i].getAttribute("value")
            }

        }

        const urlBase = "http://localhost:8080/news/";
        const listArticles = document.getElementById("articles");
        let texto = "";
        var myHeaders = new Headers();

        var myInit = { method: "GET", headers: myHeaders };

        var myRequest = new Request(`${urlBase}`, myInit);
    
        await fetch(myRequest).then(async function (response) {
            if (!response.ok) {
                listArticles.innerHTML = "Can't show articles right now!";
            } else{
                articles = await response.json();
                console.log(articles);
                //style="max-width: 25rem;">

                
                for (const article of articles) {  
                    
                    texto += `
                    <div class="card border-light" >
                        <div class="col">
                            <div class="card-header">${article.source}</div>
                                <div class="card">
                                    <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text"><button type="button" class="btn btn-outline-primary"><a href="${article.url}">Go to site</a></button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`; 
                    
                }   
                }
                listArticles.innerHTML = texto;
            
    
        });
    })();
}
