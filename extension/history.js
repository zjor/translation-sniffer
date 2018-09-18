chrome.storage.local.get((res) => {
	let content = ""

	Object.keys(res).forEach((resource) => {
		Object.keys(res[resource]).forEach((language) => {
			Object.keys(res[resource][language]).forEach((date) => {
				console.log(date)
				content += `<h3>${date}</h3><ul>`
				res[resource][language][date].forEach((word) => {
					content += `<li>${word} [${language}] [${resource}]</li>`
				})
				content += "</ul>"

			})
		})
	})
	document.getElementById("history").innerHTML = content
})		
