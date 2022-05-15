using Diary.Models.SubPost;

namespace Diary.Models
{
    public class Post
    {
        public Guid ID { get; set; }
        public DateTime TimePost { get; set; }
        public string Title { get; set; }

        public Guid ImageID { get; set; }
        public virtual PostImage? PostImage { get; set; }
        public Guid VidioID { get; set; }
        public virtual PostVidio? PostVidio { get; set; }
        public Guid TextID { get; set; }
        public virtual PostText? PostText { get; set; }
        public Guid UserID { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<Comment>? Comments { get; set; }
    }
}
