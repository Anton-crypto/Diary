using Diary.Models;
using Microsoft.AspNetCore.Mvc;

namespace Diary.GraphQL
{
    public class Queries
    {
        [UseProjection]
        public IQueryable<Post> Read([Service]DiaryContextDb context)
        {
            var posts = context.Posts;

            return posts;
        }
    }
}
