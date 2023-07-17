using sadet.autodb.api.Models;

namespace sadet.autodb.api.Interfaces;

public interface IGamesRepository
{
    public bool Exists(int appid);
    public ICollection<Game> Get();
    public Game Get(int appid);
}