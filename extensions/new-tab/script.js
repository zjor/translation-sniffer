console.log("Hello world")

const spanId = document.querySelector('#user-id')
const spanEmail = document.querySelector('#user-email')

chrome.identity.getProfileUserInfo((info) => {
	console.log(info)
	const { id, email } = info
	spanId.innerText = id
	spanEmail.innerText = email
})