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

    public CustomData GetData(int appId)
    {
        var innerData = _context.Data.Where(d => d.Appid == appId)
            .OrderBy(d => d.CreateDate)
            .Select(d => d.Completion)
            .ToArray();
        
        return new CustomData()
        {
            Count = innerData.Length,
            Data = innerData
        };
    }

    public bool Exists(int appid)
    {
        return _context.Data.Any(d => d.Appid == appid);
    }
}