import { IUsers } from "./../Interface/db/IUsers";
import { ITypeOrder } from "./../Interface/db/ITypeOrder";
import { ITypeMaintenance } from "./../Interface/db/ITypeMaintenance";
import { IStore } from "./../Interface/db/IStore";
import { IPositionPermissions } from "./../Interface/db/IPositionPermissions";
import { IPermissionsUser } from "./../Interface/IPermissionsUser";
import { IPosition } from "./../Interface/db/IPosition";
import { IPermissions } from "./../Interface/db/IPermissions";
import { IOrderDelivery } from "./../Interface/db/IOrderDelivery";
import { IMotorcycle } from "./../Interface/db/IMotorcycle";
import { IMaintenanceMotor } from "./../Interface/db/IMaintenanceMotor";
import { IClients } from "./../Interface/db/IClients";
import { IClientAddress } from "./../Interface/db/IClientAddress";
import { IAddress } from "./../Interface/db/IAddress";
export class TableMapper {
  private static TableMapping: Record<string, string> = {
    IAddress: "address",
    IClientAddress: "client_address",
    IClients: "clients",
    IMaintenanceMotor: "maintenance_motor",
    IMotorcycle: "motorcycle",
    IOrderDelivery: "order_delivery",
    IPermissions: "permissions",
    IPosition: "position",
    IPermissionsUser: "permissions_user",
    IPositionPermissions: "position_permissions",
    IStore: "store",
    ITypeMaintenance: "type_maintenance",
    ITypeOrder: "type_order",
    IUsers: "users",
  };

  public static GetTableName(interfaceName:string):string{
    const tableName = this.TableMapping[interfaceName];
    if (!tableName) {
        throw new Error(`Nome da tabela não encontrado para a interface: ${interfaceName}`);
    }
    return tableName;
  }
  
  // Método para adicionar novos mapeamentos dinamicamente (opcional)
//   public static addMapping(interfaceName: string, tableName: string): void {
//     if (this.tableMappings[interfaceName]) {
//       throw new Error(`Interface ${interfaceName} já está mapeada para a tabela ${this.tableMappings[interfaceName]}`);
//     }
//     this.tableMappings[interfaceName] = tableName;
 // }
}


import "reflect-metadata";
export class MetadataUtil {
    public static InterfaceName(name: string): ClassDecorator {
      return function (constructor: Function) {
        Reflect.defineMetadata("interfaceName", name, constructor);
      };
    }
  
    public static GetInterfaceName(target: Function): string | undefined {
      return Reflect.getMetadata("interfaceName", target);
    }
  }
