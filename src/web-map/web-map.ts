import Observer from '@xizher/observer'
import { baseUtils } from '@xizher/js-utils'
import { Map as LeafletMap, MapOptions } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import WebMapPlugin from '../web-map-plugin/web-map-plugin'

/** 地图对象接口 */
export interface IMap extends LeafletMap {
  $owner: WebMap
}

/** WebMap类 */
export class WebMap extends Observer<{
  'loaded': void
}> {

  //#region 公有属性（插件对象）

  // basemap?: Basemap
  // mapCursor?: MapCursor

  //#endregion

  //#region 私有属性

  /** 地图目标容器Id */
  private _targetDiv: string

  /** 地图对象 */
  private _map: IMap

  /** 配置项 */
  private _options: MapOptions = {
    center: [0, 0],
    zoom: 1,
  }

  //#endregion

  //#region getter

  public get targetDiv () : string {
    return this._targetDiv
  }

  public get map () : IMap {
    return this._map
  }

  //#endregion

  //#region 构造函数

  constructor (targetDiv: string, options: MapOptions = {}) {
    super()
    this._targetDiv = targetDiv
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : this {
    const map = new LeafletMap(this._targetDiv, this._options)
    this._map = Object.assign(map, { $owner: this })
    return this
  }

  //#endregion

  //#region 公有方法

  /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
  public use <T> (plugin: WebMapPlugin<T>) : WebMap {
    this[plugin.pluginName] = plugin
    return this
  }

  /**
   * 挂载WebMap
   */
  public mount () : WebMap {
    this._init()
    for (const prop in this) {
      if (this[prop]['pluginName']) {
        // eslint-disable-next-line
        // @ts-ignore
        this[prop].installPlugin(this)
      }
    }
    this._map.whenReady(() => this.fire('loaded'))
    return this
  }

  //#endregion

}

export default WebMap
