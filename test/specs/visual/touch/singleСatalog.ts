import { singleСatalog } from "../../../../pages/singleСatalog";

const fs = require('fs');
const path = require('path');
const expectChai = require('chai').expect;

describe('Визуальный тест Категории каталога', async () => {

  beforeEach(async () => {
    await browser.url('/single-catalog-page.html');
  });

    it('проверка блока header', async () => {
      await browser.visualCheckHeader(await singleСatalog.getArrayForVisualmobile(), 'header', "singleСatalog/")
    });

    it('проверка блока breadcrumbs', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisualmobile(), 'breadcrumbs', "singleСatalog/")
    });

    it('проверка блока catalogHead', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisualmobile(), 'catalogHead', "singleСatalog/")
    });

    it('проверка блока catalogSelect', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisualmobile(), 'catalogSelect', "singleСatalog/")
    });

    it('проверка блока catalogMobile', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisualmobile(), 'catalogMobile', "singleСatalog/")
    });

    it('проверка блока seo', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisualmobile(), 'seo', "/")
    });

    it('проверка блока footer', async () => {
      await browser.visualCheckBlock(await singleСatalog.getArrayForVisualmobile(), 'footer', "/")
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
    await browser.execute(function() {
      return window.scrollTo(0, 0);
      })
  });

  it('проверка расстояние между header и breadcrumbs', async () => {
    await browser.distanceDown(await singleСatalog.header, await singleСatalog.breadcrumbs, 20, 5)
  });

  it('проверка расстояние между breadcrumbs и catalogHead', async () => {
    await browser.distanceDown(await singleСatalog.breadcrumbs, await singleСatalog.catalogHead, 20, 5)
  });

  it('проверка расстояние между catalogHead и catalogSelect', async () => {
    await browser.distanceDown(await singleСatalog.catalogHead, await singleСatalog.catalogSelect, 30, 5)
  });

  it('проверка расстояние между catalogSelect и catalogMobile', async () => {
    await browser.distanceDown(await singleСatalog.catalogSelect, await singleСatalog.catalogMobile, 30, 5)
  });

  it('проверка расстояние между catalogMobile и pagination', async () => {
    await browser.distanceDown(await singleСatalog.catalogMobile, await singleСatalog.pagination, 40, 5)
  });

  it('проверка расстояние между pagination и seo', async () => {
    await browser.distanceDown(await singleСatalog.pagination, await singleСatalog.seo, 0, 5)
  });

  it('проверка расстояние между seo и footer', async () => {
    await browser.distanceDown(await singleСatalog.seo, await singleСatalog.footer, 60, 5)
  });

});

describe('Визуальный тест Категории каталога - некоторые элементы', async () => {
  beforeEach(async () => {
    await browser.url(''+"/single-catalog-page.html");
    await browser.execute(function() {
      return window.scrollTo(0, 0);
      })
  });

    it('проверка открытия и закрытия окна фильтра', async () => {
      await (await singleСatalog.filterBtnMobile).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/singleСatalog/фильтр/открыт', {}), 0, 0, 'фильтр открыт')
      await (await singleСatalog.filterBtnClose).click()
      await browser.pause(1000)
      await browser.visualCheck(await browser.checkScreen('/singleСatalog/фильтр/закрыт', {}), 0, 0, 'фильтр закрыт')
    });

    it('проверка чекбосов в фильтре', async () => {
      await (await singleСatalog.filterBtnMobile).click()
      const checkBoxFilter = await singleСatalog.checkBoxFilter
      const filterContainer = await singleСatalog.filterContainer
      for (let index = 0; index < checkBoxFilter.length; index++) {
        await (await checkBoxFilter)[index].click()
        await browser.pause(500)
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
      await browser.visualCheck(await browser.checkScreen('/singleСatalog/сортировка/сортировка закрыта', {}), 0, 0, 'селект открыт')
    });

});



