import Observer from '@xizher/observer';
import { Layer, Map as LeafletMap } from 'leaflet';
import { IMap } from '../web-map/web-map';
/** 图层扩展类 */
declare class ExtLayer<T extends Layer> extends Observer<{
    'change:visible': {
        visible: boolean;
    };
}> {
    /** 图层对象 */
    private _layer;
    private _visible;
    /** 图层容器 */
    private _layerGroup;
    get target(): T;
    get visible(): boolean;
    /**
     * 构造图层扩展对象
     * @param layer 原生Leaflet图层
     */
    constructor(layer: T);
    /**
     * 添加到指定地图对象
     * @param map 地图对象
     * @returns this
     */
    addTo(map: IMap | LeafletMap): this;
    /**
     * 设置图层可见性
     * @param visible 可见性
     * @returns this
     */
    setVisible(visible: boolean): this;
}
export default ExtLayer;
