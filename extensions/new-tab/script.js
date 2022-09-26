console.log("Hello world")

const spanId = document.querySelector('#user-id')
const spanEmail = document.querySelector('#user-email')

chrome.identity.getProfileUserInfo((info) => {
	console.log(info)
	const { id, email } = info
	spanId.innerText = id
	spanEmail.innerText = email
})

const configForm = document.querySelector('#airtable_config_form')
configForm.addEventListener('submit', (e) => {
	const baseIdInput = document.querySelector('#base_id')
	const apiKeyInput = document.querySelector('#api_key')
	const tableIdInput = document.querySelector('#table_id')

	e.preventDefault()
	chrome.storage.local.set({
		airtable: {
			baseId: baseIdInput.value,
			apiKey: apiKeyInput.value,
			tableId: tableIdInput.value
		}
	}, () => console.log('Airtable config saved'))
})

chrome.storage.local.get(['airtable'], (result) => {
	if (result.airtable && result.airtable.baseId) {
		console.log('Going on')
	} else {
		console.log('Airtable config is empty')
	}
})