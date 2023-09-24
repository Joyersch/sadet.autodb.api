using System.Collections;
using sadet.autodb.api.Context;
using sadet.autodb.api.Interfaces;
using sadet.autodb.api.Models;

namespace sadet.autodb.api.Repository;

public class DataRepository : IDataRepository
{
    private readonly ApplicationDbContext _context;

    public DataRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public DataSet GetData(long appId)
    {
        var innerData = _context.Data.Where(d => d.Appid == appId)
            .OrderBy(d => d.CreateDate)
            .Select(d => new DataEntry { Time = d.CreateDate, Value = d.Completion })
            .ToArray();

        return new DataSet()
        {
            Count = innerData.Length,
            Data = innerData
        };
    }

    public bool Exists(long appid)
    {
        return _context.Data.Any(d => d.Appid == appid);
    }

    public DataSet GetData(long appId, int limit)
    {
        var innerData = _context.Data.Where(d => d.Appid == appId)
            .OrderBy(d => d.CreateDate)
            .Select(d => new DataEntry { Time = d.CreateDate, Value = d.Completion })
            .Take(limit)
            .ToArray();

        return new DataSet()
        {
            Count = innerData.Length,
            Data = innerData
        };
    }

    /*
    public DataSet GetData(long appId, int limit)
    {
        var data = GetData(appId);
        data.Count = limit;
        data.Data = data.Data[^limit..data.Data.Length];
        return data;
    }
    */

    public bool HasDropped(long appId)
    {
        var max = _context.Data.Where(d => d.Appid == appId)
            .Max(d => d.Completion);

        var latest = GetData(appId, 1).Data[0].Value;

        return max > latest;
    }
}