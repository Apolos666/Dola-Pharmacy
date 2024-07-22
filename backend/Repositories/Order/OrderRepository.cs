using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.Order;

public class OrderRepository(DbFactory dbFactory) : Repository<Models.Order>(dbFactory), IOrderRepository;