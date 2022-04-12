export class Header {
    
    get menu() { return $$('.nav__main-menu li')}
    get menuMobile() { return $('.nav__burger')}
    get navCity() {return $('.nav__city')}
    get cityСlose() {return $('.city__close')}
    get navBtnForm() {return $('.nav__button')}
    get navBtnFormMenu() {return $('.nav__mobilebutton')}
    get navCloseForm() {return $('.callback__close')}
    get citySearchInput() {return $('.city__search-input')}
    get callbackInput() {return $$('.callback__form-input')}

    async clickInputCity() {
        await (await this.callbackInput)[0].click()
    }

    async clickInputPhone() {
        await (await this.callbackInput)[1].click()
    }
    
    
}

export const header = new Header()