import { Loader, LoadingManager, PerspectiveCamera, Vector2 } from 'three';
import FSpyDataManager from './FSpyDataManager';
import { FSpyCameraJson, FSpyCameraData } from './type';
export default class FSpyCamerLoader extends Loader {
    camera: PerspectiveCamera;
    targetCanvasSize: Vector2;
    targetCanvas: HTMLCanvasElement | null;
    dataManager: FSpyDataManager;
    private isIE;
    private internalIsEnableResizeEvent;
    constructor(manager?: LoadingManager);
    get isEnableResizeEvent(): boolean;
    set isEnableResizeEvent(resizeEventBoolean: boolean);
    load(url: string, onLoad?: (camera: PerspectiveCamera) => void, onProgress?: (xhr: object) => void, onError?: (error: ErrorEvent) => void): void;
    parse(fSpyJson: FSpyCameraJson): PerspectiveCamera;
    setCanvas(canvas: HTMLCanvasElement): void;
    removeCanvas(): void;
    setResizeUpdate(): void;
    removeResizeupdate(): void;
    protected createCamera(): PerspectiveCamera;
    private static getIsUseIE;
    onResize(): void;
    getData(): FSpyCameraJson | null;
    getComputedData(): FSpyCameraData | null;
}
