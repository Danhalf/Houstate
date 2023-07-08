window.addEventListener('DOMContentLoaded', () => {
   const buttonSelector = document.querySelector('.nav-btn');
   const menuSelector = document.querySelector('.nav-menu');
   const overlayClass = 'nav-overlay'
   const buttonClassOpen = 'button-open'
   const menuClassOpen = 'menu-open'


   class NavMenu {

      #isMenuOpen = false;

      constructor({ buttonSelector, buttonClassOpen, menuSelector, menuClassOpen, overlayClass }) {
         this.buttonSelector = buttonSelector
         this.buttonClassOpen = buttonClassOpen
         this.menuSelector = menuSelector
         this.menuClassOpen = menuClassOpen
         this.overlayClass = overlayClass
      }

      #open() {
         this.buttonSelector.classList.add(this.buttonClassOpen)
         document.body.classList.add(this.overlayClass)
         this.#isMenuOpen = true
      }

      #close() {
         this.buttonSelector.classList.remove(this.buttonClassOpen)
         document.body.classList.remove(this.overlayClass)
         this.#isMenuOpen = false
      }

      action = () => {
         if (this.#isMenuOpen) {
            this.#close()
         } else {
            this.#open()
         }
      }
   }

   const { action } = new NavMenu(
      {
         buttonSelector,
         buttonClassOpen,
         menuSelector,
         menuClassOpen,
         overlayClass
      })

   buttonSelector.addEventListener('click', action);


   const telInputs = document.querySelectorAll('input[type=text]');

   telInputs.forEach(input => intlTelInput(input))
})

