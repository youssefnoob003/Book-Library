using auth.Models;
using Microsoft.Extensions.DependencyInjection;
using auth.Repositories;
using auth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtConfig = builder.Configuration.GetSection("Jwt").Get<JwtConfig>();
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtConfig.Issuer,
            ValidAudience = jwtConfig.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Key))
        };
    });
builder.Services.AddAuthorization();

// Add JwtService and UserRepository to the services collection
builder.Services.AddSingleton<JwtService>();
builder.Services.AddControllers();
builder.Services.AddSingleton<UserRepository>();

var app = builder.Build();
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();

app.MapGet("/security/getMessage", () => "Hello World!").RequireAuthorization();
app.MapPost("/security/Existing", [AllowAnonymous] (UserModel user, UserRepository userRepository) =>
{
    var existingUser = userRepository.GetUserByUsername(user.Username);
    if (existingUser == null) return Results.Ok("false");
    else return Results.Ok("true");
});
app.MapPost("/security/createToken", [AllowAnonymous] (UserModel user, JwtService jwtService, UserRepository userRepository) =>
{
    var existingUser = userRepository.GetUserByUsername(user.Username);
    if (existingUser != null && existingUser.Password == user.Password)
    {
        var jwtConfig = builder.Configuration.GetSection("Jwt").Get<JwtConfig>();
        var jwtToken = jwtService.GenerateToken(jwtConfig.Issuer, jwtConfig.Audience, jwtConfig.Key, existingUser);
        return Results.Ok(jwtToken);
    }

    return Results.Unauthorized();
});

app.MapPost("/security/AddUser", [AllowAnonymous] (UserModel user, JwtService jwtService, UserRepository userRepository) =>
{
    userRepository.AddUser(user);

});


app.UseAuthentication();
app.UseAuthorization();

app.Run();
