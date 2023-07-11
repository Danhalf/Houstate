const getYoutubeVideoCode = url => url.includes('.com/') ? url.split('.com/')[1] : url.split('.be/')[1]
// 	const init = url.indexOf('?') + 3
// 	const final = url.indexOf('&', init)
// 	const code = final === -1 ? url.slice(init) : url.slice(init, final)
// 	const params = url.slice(final + 1)
// 	console.log(`${code}?${params}&`)
// 	return final === -1 ? `${code}?` : `${code}?${params}&`;
// };

const videoHtmlGenerator = code => (
	`<div class="v-modal__content">
		<div class="v-modal--close"></div>
		<div class="v-modal__video">
			<iframe src="https://www.youtube.com/embed/${code}/autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
		</div>
	</div>`
)




const printYoutubeModal = youtubeVideoCode => {
	const modal = document.createElement('div');
	modal.classList.add('v-modal');
	modal.innerHTML = videoHtmlGenerator(youtubeVideoCode)
	document.body.appendChild(modal);
	closeModal(modal);
};

const closeModal = modal => {
	const cerrarModal = document.querySelector('.v-modal--close');
	cerrarModal.addEventListener('click', () => {
		document.body.removeChild(modal);
	});

	window.addEventListener('keyup', e => {
		if (e.key === 'Escape') {
			cerrarModal.click();
		}
	});
};


const openYoutubeModal = selector => {
	let linksElements = [...document.querySelectorAll(selector)],
		links = linksElements.map(link => link.href);
	linksElements.forEach((el, i) => {
		el.addEventListener('click', e => {
			e.preventDefault();
			printYoutubeModal(getYoutubeVideoCode(links[i]));
		});
	});
};

openYoutubeModal('.v-modal--trigger');