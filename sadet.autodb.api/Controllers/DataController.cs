using System.Collections;
using Microsoft.AspNetCore.Mvc;
using sadet.autodb.api.Context;
using sadet.autodb.api.Interfaces;
using sadet.autodb.api.Models;

namespace sadet.autodb.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DataController : Controller
{
    private readonly IDataRepository _repository;

    public DataController(IDataRepository repository)
    {
        _repository = repository;
    }

    [HttpGet("{appid}")]
    [ProducesResponseType(200, Type = typeof(ICollection<Data>))]
    [ProducesResponseType(400)]
    public IActionResult GetData(int appid)
    {
        if (!_repository.Exists(appid))
            return NotFound();
        return Ok(_repository.GetData(appid));
    }
}