import Observer from '@xizher/observer';
import { Map as LeafletMap, MapOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import WebMapPlugin from '../web-map-plugin/web-map-plugin';
import Basemap from '../plugins/basemap/basemap';
import MapCursor from '../plugins/map-cursor/map-cursor';
import MapElementDisplay from '../plugins/map-element-display/map-element-display';
/** 地图对象接口 */
export interface IMap extends LeafletMap {
    $owner: WebMap;
}
/** WebMap配置项 */
export interface IWebMapOptions extends MapOptions {
    _: void;
}
/** WebMap类 */
export declare class WebMap extends Observer<{
    'loaded': void;
}> {
    basemap?: Basemap;
    mapCursor?: MapCursor;
    mapElementDisplay?: MapElementDisplay;
    /** 地图目标容器Id */
    private _targetDiv;
    /** 地图对象 */
    private _map;
    /** 配置项 */
    private _options;
    get targetDiv(): string;
    get map(): IMap;
    constructor(targetDiv: string, options?: MapOptions);
    /** 初始化 */
    private _init;
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use<T>(plugin: WebMapPlugin<T>): WebMap;
    /**
     * 挂载WebMap
     */
    mount(): WebMap;
}
export default WebMap;
