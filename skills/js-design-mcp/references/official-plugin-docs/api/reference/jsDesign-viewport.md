# jsDesign.viewport

当前在屏幕上可见的画布区域中可用的属性和方法，视窗的位置通过其中心坐标和缩放比例来表示。

#### center: Vector

屏幕上当前可见区域的中心。

#### zoom: number

当前页面的缩放比例，1.0 表示 100% 缩放，0.5 表示 50% 缩放。

#### scrollAndZoomIntoView(nodes: ReadonlyArray\<BaseNode\>): void

自动调节缩放比例和视窗的位置，使页面内的所有内容可见（即显示全部），并位于视口中心。

#### bounds: Rect [readonly]

当前页面画布区域的边界坐标（x，y），相对于窗口左上角。用户调整窗口大小或设置显示/隐藏标尺时，坐标会发生变化。
