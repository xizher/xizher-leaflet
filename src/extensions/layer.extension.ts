import Observer from '@xizher/observer'
import { Layer, LayerGroup, Map as LeafletMap } from 'leaflet'
import { IMap } from '../web-map/web-map'

/** 图层扩展类 */
class ExtLayer <T extends Layer> extends Observer<{
  'change:visible': { visible: boolean }
}> {

  //#region 私有属性

  /** 图层对象 */
  private _layer: T

  private _visible = true

  /** 图层容器 */
  private _layerGroup: LayerGroup

  //#endregion

  //#region getter

  get target () : T {
    return this._layer
  }

  get visible () : boolean {
    return this._visible
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造图层扩展对象
   * @param layer 原生Leaflet图层
   */
  constructor (layer: T) {
    super()
    this._layer = layer
    this._layerGroup = new LayerGroup()
      .addLayer(layer)
  }

  //#endregion

  //#region 公有方法

  /**
   * 添加到指定地图对象
   * @param map 地图对象
   * @returns this
   */
  addTo (map: IMap | LeafletMap) : this {
    this._layerGroup.addTo(map)
    return this
  }

  /**
   * 设置图层可见性
   * @param visible 可见性
   * @returns this
   */
  setVisible (visible: boolean) : this {
    this._layerGroup.removeLayer(this._layer)
    if (visible) {
      this._layerGroup.addLayer(this._layer)
    }
    this.fire('change:visible', { visible })
    return this
  }

  //#endregion

}

export default ExtLayer
