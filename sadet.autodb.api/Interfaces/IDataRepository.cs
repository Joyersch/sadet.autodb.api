using sadet.autodb.api.Models;

namespace sadet.autodb.api.Interfaces;

public interface IDataRepository
{
    public bool Exists(int appid);
    public CustomData GetData(int appId);
}