SELECT 
	order_delivery.id,
    users.name,
    order_delivery.date,
    client.name,
    address.place , address.number, address.neighborhood , address.city  ,address.uf  ,
    type_order.name,
    order_delivery.value,
    order_delivery.obs
FROM 
    order_delivery
INNER JOIN 
    users
    ON order_delivery.user_id = users.id 
INNER JOIN 
    client
    ON order_delivery.client_id = client.id 
INNER JOIN 
    address
    ON order_delivery.address_id = address.id 
    INNER JOIN 
    type_order
    ON order_delivery.type_order_id = type_order.id 