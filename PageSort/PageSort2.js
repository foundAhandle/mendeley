var riverCallback = {
  "onsuccess" : function(obj) {
    // TODO 
    if(!obj) {
      return;
    }
    var title = document.getElementById("title");
    if(title && obj.documents) {
      title.innerHTML = obj.documents.title;
    }
    if(obj.documents) {
//      var river = document.getElementById("river");
      var documents = obj.documents;
      for(var i=0, itemSize=documents.length; i<itemSize; i++) {
        var paper = documents[i];
        var atitle = document.createElement("div");
        atitle.className = "title";
        atitle.innerHTML = paper.title;

        var publication = document.createElement("div");
        //publication.className = "publication_outlet hidden";
        publication.id = "publication_outlet-" + i;
        var pubname = paper.publication_outlet ;
        publication.innerHTML = pubname;
		
        var article = document.createElement("div");
        article.className = "article";
        article.appendChild(atitle);
        //addEvent(atitle, "click", toggleVisibilityWrapper(publication.id));
        
        var anchor = document.createElement("a");
        anchor.appendChild(document.createTextNode("permalink"));
        anchor.href = paper.mendeley_url;
        anchor.setAttribute("target", "_blank");

        var permalink = document.createElement("div");
        permalink.appendChild(anchor);
        publication.appendChild(permalink);
        
		var Authors = document.createElement("div");
		var lauthors = paper.authors.toLowerCase();
		lauthors = lauthors.replace(/[^\w\s]/g, "");
		Authors.innerHTML = lauthors;
		
		// BEGIN SORTING CODE HERE
		var PScore = document.createElement("div");
		SearchTerms = ['computation', 'analysis', 'system', 'human', 'geraci'];
		SLength = SearchTerms.length;
		PaperScore = (i+.1);
		var ltitle = paper.title.toLowerCase();
		
		while (SLength--) {
			if (ltitle.indexOf(SearchTerms[SLength]) !== -1) {
			PaperScore = (PaperScore*.8);
			}
			if (lauthors.indexOf(SearchTerms[SLength]) !== -1) {
			PaperScore = (PaperScore*.4);
			
			}
		PScore.innerHTML = PaperScore;
		paper.sortOrder = PaperScore;
		console.log(paper.sortOrder);
		}
		//END SORTING CODE
		
//       article.appendChild(atitle);
//	}
		function compareDocuments(a, b){
			return a.sortOrder - b.sortOrder;
		}
		obj.documents.sort(compareDocuments);
		
        article.appendChild(publication);
		article.appendChild(PScore);
		article.appendChild(Authors);
        river.appendChild(article);
		
		}
    }
    log("SUCCESS: Loaded documents.json file");
  },
  "onerror" : function(req) {
    log("ERROR: Unable to download documents.json file" + req);
  }
};

function toggleVisibility(id) {
  var elem = document.getElementById(id);
  if(!elem) {
    return;
  }
  var index = elem.className.indexOf("hidden");
  if(index != -1) {
    elem.className = elem.className.substring(0, index) + elem.className.substring(index + 7);
  }
}

function toggleVisibilityWrapper(id) {
  return function() {
    var elem = document.getElementById(id);
    if(!elem) {
      return;
    }
    var index = elem.className.indexOf("hidden");
    if(index != -1) {
      elem.className = elem.className.substring(0, index) + elem.className.substring(index + 7);
    } else {
      elem.className = elem.className + " hidden"; 
    }
  };
}
