export class SingleСatalog {
    get header() { return $('.header')}
    get breadcrumbs() { return $('.breadcrumbs')}
    get catalogHead() { return $('.catalog__head')}
    get catalogSelect() { return $('.catalog__select')}
    get catalogMobile() { return $('.catalog__item-list')}
    get pagination() { return $('.text-center')}
    

    get filter() { return $('.filter')}
    get catalog() { return $('.catalog__container')}
    get seo () { return $('.seo')}
    get footer () { return $('.footer')}

    get filterBtnMobile() { return $('.catalog__select-btn')}
    get filterBtnClose() { return $('.filter__btn')}
    get filterContainer() { return $('.filter__container')}
    get checkBoxFilter() { return $$('.filter__category label')}
    get catalogSelectTitle() { return $('.catalog__select-title')}
    get catalogSelectList() { return $$('.catalog__select-dropdown--active li')}
    
    
    async getArrayForVisual() {
        let arrayForVisualer = {     
            'header': await this.header, 
            'breadcrumbs': await this.breadcrumbs,
            'catalogHead': await this.catalogHead,
            'filter': await this.filter,
            'catalog': await this.catalog,
            'seo': await this.seo,
            'footer': await this.footer
          };
        return arrayForVisualer
    }

    async getArrayForVisualmobile() {
        let arrayForVisualer = {     
            'header': await this.header, 
            'breadcrumbs': await this.breadcrumbs,
            'catalogHead': await this.catalogHead,
            'catalogSelect': await this.catalogSelect,
            'catalogMobile': await this.catalogMobile,
            'pagination': await this.pagination,
            'seo': await this.seo,
            'footer': await this.footer
          };
        return arrayForVisualer
    }
    
    

    
}

export const singleСatalog = new SingleСatalog()