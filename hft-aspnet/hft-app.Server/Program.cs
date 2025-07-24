using hft_app.Server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (builder.Configuration.GetValue<bool>("useSqlServer"))
{
    builder.Services.AddDbContext<HftDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConn")));
}
else
{
    builder.Services.AddDbContext<HftDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConn")));
}

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
