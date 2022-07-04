using Diary.Models;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Controllers.WebSocket
{
    public class ChatHub : Hub
    {
        private static Dictionary<string, Guid> _user = new Dictionary<string, Guid>();

        public override async Task OnConnectedAsync()
        {
            Guid userId = Guid.Parse(Context.GetHttpContext().Request.Query["userId"]);
            _user.Add(Context.ConnectionId, userId);
                
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} вошел в чат");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _user.Remove(Context.ConnectionId); 

            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} покинул в чат");
            await base.OnDisconnectedAsync(exception);
        }
        public async Task BroadcastChartData(Chat chat)
        {
            string userConnectionIdTo = _user.FirstOrDefault(u => u.Value == chat.UserToId).Key;

            await Clients.Client(userConnectionIdTo).SendAsync("broadcastchartdata", chat);
            //await Clients.All.SendAsync("broadcastchartdata", chat);
        }
    }
}

