import YouTubeVideo from "../YouTubeVideo"

interface YouTubeVideoCardProps {
  readonly video: YouTubeVideo
}

const YouTubeVideoCard = (props: YouTubeVideoCardProps) => {

  const handleClick = () => {
    window.open(
      `https://www.youtube.com/watch?v=${props.video.videoId}`,
      '_blank', 'noopener,noreferrer'
    )
  }

  return (
    <div className="yt-card" onClick={handleClick}>
      <img className="yt-card-img-top" src={props.video.thumbnailsUrl} alt="video thumbnails" />
      <h5 className="yt-card-title">{props.video.title}</h5>
    </div>
  )
}

export default YouTubeVideoCard
