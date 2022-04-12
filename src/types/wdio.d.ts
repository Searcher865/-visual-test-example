declare namespace WebdriverIO {
    interface Browser {
        visualCheck,
        numberCid,
        distanceDown: (oneElement: WebdriverIO.Element, twoElement: WebdriverIO.Element, expect: number, difference: number, message?: string) => any,
        distanceRight: (oneElement: WebdriverIO.Element, twoElement: WebdriverIO.Element, expect: number, difference: number, message?: string) => any,
        visualCheckBlock: (arrayObject: Object, checkElement: string, path: string) => any,
        visualCheckHeader: (arrayObject: Object, checkElement: string, path: string) => any,
        foldersScreenshot: string,
        finishedVisualCheck: boolean
    }
}