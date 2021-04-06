import Observer from '@xizher/observer';
import { LayerGroup } from 'leaflet';
/** 图层扩展类 */
class ExtLayer extends Observer {
    //#endregion
    //#region 构造函数
    /**
     * 构造图层扩展对象
     * @param layer 原生Leaflet图层
     */
    constructor(layer) {
        super();
        this._visible = true;
        this._layer = layer;
        this._layerGroup = new LayerGroup()
            .addLayer(layer);
    }
    //#endregion
    //#region getter
    get target() {
        return this._layer;
    }
    get visible() {
        return this._visible;
    }
    //#endregion
    //#region 公有方法
    /**
     * 添加到指定地图对象
     * @param map 地图对象
     * @returns this
     */
    addTo(map) {
        this._layerGroup.addTo(map);
        return this;
    }
    /**
     * 设置图层可见性
     * @param visible 可见性
     * @returns this
     */
    setVisible(visible) {
        this._layerGroup.removeLayer(this._layer);
        if (visible) {
            this._layerGroup.addLayer(this._layer);
        }
        this.fire('change:visible', { visible });
        return this;
    }
}
export default ExtLayer;
