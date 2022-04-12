import { singleСatalog } from "../../../../pages/singleСatalog";

const fs = require('fs');
const path = require('path');
const expectChai = require('chai').expect;


describe('Визуальный тест Категории каталога', async () => {

  beforeEach(async () => {
    await browser.url('/single-catalog-page.html');
  });

    it('проверка блока header', async () => {
      await browser.visualCheckHeader(await singleСatalog.getArrayForVisual(), 'header', "singleСatalog/")
    });

    it('проверка блока breadcrumbs', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisual(), 'breadcrumbs', "singleСatalog/")
    });

    it('проверка блока catalogHead', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisual(), 'catalogHead', "singleСatalog/")
    });

    it('проверка блока filter', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisual(), 'filter', "singleСatalog/")
    });

    it('проверка блока catalog', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisual(), 'catalog', "singleСatalog/")
    });

    it('проверка блока seo', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisual(), 'seo', "seo/")
    });

    it('проверка блока footer', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisual(), 'footer', "footer/")
    });

  afterEach(async () => {
    await browser.execute(function() {
      return window.scrollTo(0, 0);
      })
  });

});


describe('Расстояние между блоками Категории каталога', async () => {

  beforeEach(async () => {
    await browser.url('/single-catalog-page.html');
  });

  it('проверка расстояние между header и breadcrumbs', async () => {
    await browser.distanceDown(await singleСatalog.header, await singleСatalog.breadcrumbs, 30, 5)
  });

  it('проверка расстояние между breadcrumbs и catalogHead', async () => {
    await browser.distanceDown(await singleСatalog.breadcrumbs, await singleСatalog.catalogHead, 40, 5)
  });

  it('проверка расстояние между catalogHead и filter', async () => {
    await browser.distanceDown(await singleСatalog.catalogHead, await singleСatalog.filter, 40, 5)
  });

  it('проверка расстояние между catalogHead и catalog', async () => {
    await browser.distanceDown(await singleСatalog.catalogHead, await singleСatalog.catalog, 40, 5)
  });

  it('проверка расстояние между filter и catalog', async () => {
    await browser.distanceRight(await singleСatalog.filter, await singleСatalog.catalog, 0, 5)
  });

  it('проверка расстояние между filter и seo', async () => {
    await browser.distanceDown(await singleСatalog.filter, await singleСatalog.seo, 0, 5)
  });

  it('проверка расстояние между catalog и seo', async () => {
    await browser.distanceDown(await singleСatalog.catalog, await singleСatalog.seo, 0, 5)
  });

  it('проверка расстояние между seo и footer', async () => {
    await browser.distanceDown(await singleСatalog.seo, await singleСatalog.footer, 80, 5)
  });

  afterEach(async () => {
    await browser.execute(function() {
      return window.scrollTo(0, 0);
      })
  });

});

describe('Визуальный тест Категории каталога - некоторые элементы', async () => {

  beforeEach(async () => {
    await browser.url('/single-catalog-page.html');
  });
    
  it('проверка чекбосов в фильтре', async () => {
    const checkBoxFilter = await singleСatalog.checkBoxFilter
    const filterContainer = await singleСatalog.filterContainer
    for (let index = 0; index < checkBoxFilter.length; index++) {
      await (await checkBoxFilter)[index].click()
      await browser.visualCheck(await browser.checkElement(await filterContainer, '/singleСatalog/фильтр/'+index, {}), 0, 0)
    }
  });

  it('проверка селекта сортировки - закрытие по самому селетку', async () => { 
    await (await singleСatalog.catalogSelectTitle).click()
    await browser.pause(500)
    await browser.visualCheck(await browser.checkScreen('/singleСatalog/сортировка/сортировка', {}), 0, 0, 'селект открыт')
    await (await singleСatalog.catalogSelectTitle).click()
    await browser.pause(500)
    await browser.visualCheck(await browser.checkScreen('/singleСatalog/сортировка/сортировка закрыта', {}), 0, 0, 'селект закрыт')
  });

  it('проверка селекта сортировки - закрытие по пункту селетка', async () => { 
    await (await singleСatalog.catalogSelectTitle).click()
    await browser.pause(500)
    await browser.visualCheck(await browser.checkScreen('/singleСatalog/сортировка/сортировка', {}), 0, 0, 'селект открыт')
    await (await singleСatalog.catalogSelectList)[1].click()
    await browser.pause(500)
    await browser.visualCheck(await browser.checkScreen('/singleСatalog/сортировка/сортировка закрыта', {}), 0, 0, 'селект закрыт')
  });


  afterEach(async () => {
    await browser.execute(function() {
      return window.scrollTo(0, 0);
      })
  });

});



