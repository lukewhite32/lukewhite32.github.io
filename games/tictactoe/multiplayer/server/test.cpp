#include "crow.h"
#include <vector>
#include <iostream>
#include <chrono>
#include <ctype.h>

struct User {
    crow::websocket::connection* conn;
    bool 
};

struct Game {
    User* x;
    User* o;
    bool running = false;
};

std::vector<Game> games;
User* hold;

int getGameOfUser(User* user) {
    for (int x = 0; x < (int)games.size(); x ++) {
        if (games[x].x == user) {
            return x;
        }
        if (games[x].o == user) {
            return x;
        }
    }
    return -1;
}

User* getOtherUserOfGame(User* user1) {
    if (getGameOfUser(user1) == -1) {
        return NULL;
    }
    if (games[getGameOfUser(user1)].x == user1) {
        return games[getGameOfUser(user1)].o;
    }
    return games[getGameOfUser(user1)].x;
}

User* getUserFromConn(crow::websocket::connection& c) {
    if (hold) {
        if (hold -> conn == &c) {
            return hold;
        }
    }
    for (auto g : games) {
        if (g.x) {
            if (g.x -> conn == &c) {
                return g.x;
            }
        }
        else if (g.o) {
            if (g.o -> conn == &c) {
                return g.o;
            }
        }
    
    }
    return NULL;
}

int main() {
    crow::SimpleApp app;

    CROW_WEBSOCKET_ROUTE(app, "/")
    .onopen([&](crow::websocket::connection& conn) {
                if (!hold) {
                    hold = new User {&conn};
                    std::cout << "hold created" << std::endl;
                }
                else {
                    games.push_back(*new Game {hold, new User {&conn}});
                    std::cout << "hold merged" << std::endl;
                    hold = NULL;
                }
            })
    .onclose([&](crow::websocket::connection& conn, const std::string& reason) {
                if (getGameOfUser(getUserFromConn(conn)) == -1) {
                    hold = NULL;
                }
                else if (games[getGameOfUser(getUserFromConn(conn))].x -> conn != &conn) {
                    if (!hold) {
                        hold = games[getGameOfUser(getUserFromConn(conn))].o;
                    }
                    else {
                        games.push_back(*new Game {getUserFromConn(conn), hold});
                        hold = NULL;
                    }
                }
                else if (games[getGameOfUser(getUserFromConn(conn))].o -> conn != &conn) {
                    if (!hold) {
                        hold = games[getGameOfUser(getUserFromConn(conn))].x;
                    }
                    else {
                        games.push_back(*new Game {getUserFromConn(conn), hold});
                        hold = NULL;
                    }
                }
            })
    .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary) {
            if (is_binary) {
                if (isdigit(data[0])) {
                    getOtherUserOfGame(getUserFromConn(conn)) -> conn -> send_binary(data);
                }
            }
            else {
                if (isdigit(data[0])) {
                    getOtherUserOfGame(getUserFromConn(conn)) -> conn -> send_text(data);
                }
            }
            if (hold) {
                if (hold -> conn == &conn) {
                    if (data == "getPiece") {
                        conn.send_text("piece:1");
                    }
                }
            }
            else if (getOtherUserOfGame(getUserFromConn(conn)) == games[getGameOfUser(getUserFromConn(conn))].o) {
                if (data == "getPiece") {
                    conn.send_text("piece:2");
                }
            }
            else {
                if (data == "getPiece") {
                    conn.send_text("piece:1");
                }
            }
            
            if (data == "getHold") {
                if (getUserFromConn(conn) == hold) {
                    conn.send_text("hold:1");
                }
                else {
                    conn.send_text("hold:0");
                }
            }
            
        });
    app.port(8080).multithreaded().run();
}