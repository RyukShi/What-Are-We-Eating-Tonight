interface YouTubeVideoCardProps {
  readonly title: string
  readonly thumbnailsUrl: string
  readonly videoId: string
}

const YouTubeVideoCard = (props: YouTubeVideoCardProps) => {

  const handleClick = () => {
    window.open(
      `https://www.youtube.com/watch?v=${props.videoId}`,
      '_blank', 'noopener,noreferrer'
    )
  }

  return (
    <div className="yt-card" onClick={handleClick}>
      <img className="yt-card-img-top" src={props.thumbnailsUrl} alt="video thumbnails" />
      <h5 className="yt-card-title">{props.title}</h5>
    </div>
  )
}

export default YouTubeVideoCard
