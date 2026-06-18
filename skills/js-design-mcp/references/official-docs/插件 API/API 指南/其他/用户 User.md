有关用户的详细信息，不涉及活跃用户的操作相关内容。

#### id: string | null [readonly]

用户的 ID，将在进行打开文件进行操作时自动生成，如当前用户未登录，也会生成`id`，但其他未登录的用户此值为`null`。

#### name: string [readonly]

用户名，未登录的用户统一为`'Anonymous'`。

#### photoUrl: string | null [readonly]

用户头像对应的图片地址，将在打开文件进行操作时自动生成，如当前用户未登录，也会生成，但其他未登录的用户此值为`null`。

#### color: string [readonly]

用户所对应的颜色，头像外框和鼠标指针一致。

#### sessionId: number [readonly]

每个用户对应的会话 ID ，具有唯一性。同一用户在不同标签页打开同一文件时，`sessionId` 也会不同。
