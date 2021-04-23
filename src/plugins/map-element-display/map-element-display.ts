import WebMapPlugin from '../../web-map-plugin/web-map-plugin'

/** 图元控制插件类 */
export class MapElementDisplay extends WebMapPlugin<{

}> {

  //#region 构造函数

  /**
   * 构造图元控制插件对象
   */
  constructor () {
    super('mapElementDisplay')
  }

  //#endregion

}

export default MapElementDisplay
