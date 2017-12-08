(function() {
	let search_button = document.getElementById('search_button');
	search_button.addEventListener("click", function(e) {
			e.preventDefault();
			var stringSearch = search_text.value;

			var request = gapi.client.youtube.search.list({
			type:'video',
			part: 'snippet',
			q: stringSearch,
			maxResults:2,
			order: "viewCount",
			});
			let address;
			let stringId = "";
			request.execute(function(response) {
				for (let i = 0; i < response.result.items.length; i++) {
					console.log(response.result)
					console.log(response.result.items[i].snippet.thumbnails.default.url)
					console.log("    ")


					let page_wrapper = document.createElement('div');
					page_wrapper.className = "page_wrapper";
					document.body.appendChild(page_wrapper);

					let page_wrapper_yu = document.createElement('div');
					page_wrapper_yu.className = "page_wrapper_yu";
					page_wrapper.appendChild(page_wrapper_yu);

					let image = document.createElement('div');
					image.className = "image";
					page_wrapper_yu.appendChild(image);
					
					let imageTag = document.createElement('img');
					image.appendChild(imageTag);
					imageTag.src = response.result.items[i].snippet.thumbnails.high.url;

					
					let title = document.createElement('div');
					title.className = "title";
					image.appendChild(title)

					let a = document.createElement('a');
					title.appendChild(a);
					a.href = "https://www.youtube.com/watch?v=" + response.result.items[i].id.videoId;
					a.textContent  = response.result.items[i].localized;



					let author = document.createElement('div');
					let imageAuthor = document.createElement('img');
					author.className = "author";

					imageAuthor.src = "img/man-user.png"
					imageAuthor.className = "imageAuthor";
					
					page_wrapper_yu.appendChild(imageAuthor)
					page_wrapper_yu.appendChild(author);
					author.textContent = response.result.items[i].snippet.channelTitle;


					let date = document.createElement('div');
					date.className = "date";
					page_wrapper_yu.appendChild(date);
					date.textContent  = response.result.items[i].snippet.publishedAt;


					let watches = document.createElement('div');
					watches.className = "watches";
					page_wrapper_yu.appendChild(watches);

					let description = document.createElement('div');
					description.className = "description";
					page_wrapper_yu.appendChild(description);
					description.textContent  = response.result.items[i].snippet.description;


					if (i === response.result.items.length) {
						stringId += response.result.items[i].id.videoId.toString();
						continue;
					}
					stringId += response.result.items[i].id.videoId.toString() + ",";

				//	console.log(response.result.items[i].id.videoId)
				//	console.log(response.result.items[i].id.videoId)
				}

					let getWatches = gapi.client.youtube.videos.list({
					id:stringId,
					part: 'snippet,contentDetails,statistics',
					});		

					getWatches.execute(function(response) {
						for (let i = 0; i < response.result.items.length; i++) {
							console.log(response.result.items[i].statistics.viewCount);
						}
						console.log(response.result);
					});
			})

	});
})();

function init(){
	gapi.client.load("youtube", "v3", function(){

	});
	gapi.client.setApiKey("AIzaSyAo6BNS_UCYrLS_sEq0O3-jusWqfmAyhWY");
}