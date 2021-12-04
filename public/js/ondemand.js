async function getArticles() {
  var selected = "";
  var ele = document.getElementsByName("btnradio");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      selected = ele[i].getAttribute("value");
    }
  }
  const urlBase = "http://localhost:8080/news/";
  const listArticles = document.getElementById("articles");
  let texto = "";
  var myHeaders = new Headers();
  let url = urlBase + selected;

  var myInit = { method: "GET", headers: myHeaders };

  var myRequest = new Request(url, myInit);

  await fetch(myRequest).then(async function (response) {
    if (!response.ok) {
      listArticles.innerHTML = "Can't show articles right now!";
    } else {
      articles = await response.json();
      listArticles.innerHTML = "";
      for (const article of articles) {
        texto += `
                <div class="flip-card" >
                        <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img src="/images/iconcovid.png" alt="covid" style="width:100%;">
                        <h3>${article.source}</h3></div>

                            <div class="flip-card-back">
                            <h8>${article.title}</h8>
                            <br></br>
                            <br></br>
                            <button type="button" class="button-flipped"><a href="${article.url}">Website</a></button></p>
                            
                            </div>
                        </div>
                    </div>`;
      }
      listArticles.innerHTML = texto;
    }
  });
}
