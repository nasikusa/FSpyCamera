import { Loader, PerspectiveCamera, Vector2, LoadingManager } from 'three';
import FSpyDataManager from 'FSpyDataManager';
import { FSpyCameraJson } from 'type';
export default class FSpyCamerLoader extends Loader {
    camera: PerspectiveCamera;
    targetCanvasSize: Vector2;
    targetCanvas: HTMLCanvasElement | null;
    protected dataManager: FSpyDataManager;
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (camera: PerspectiveCamera) => void, onProgress: () => void, onError: () => void): void;
    parse(fSpyJson: FSpyCameraJson): PerspectiveCamera;
    setCanvas(canvas: HTMLCanvasElement): void;
    removeCanvas(): void;
    setResizeUpdate(): void;
    removeResizeupdate(): void;
    protected createCamera(): PerspectiveCamera;
    onResize(): void;
}
