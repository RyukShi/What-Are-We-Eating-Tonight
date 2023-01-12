class YouTubeVideo {
    videoId: string
    thumbnailsUrl: string
    title: string

    constructor (
        videoId: string,
        thumbnailsUrl: string,
        title: string
    ) {
        this.videoId = videoId
        this.thumbnailsUrl = thumbnailsUrl
        this.title = title
    }
}

export default YouTubeVideo

