using backend.Data;
using backend.Repositories.Generic;

namespace backend.Repositories.OrderItem;

public class OrderItemRepository(DbFactory dbFactory) : Repository<Models.OrderItem>(dbFactory), IOrderItemRepository;