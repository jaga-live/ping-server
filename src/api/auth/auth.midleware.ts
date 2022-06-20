/////TODO
export function authMiddleware(funcToCallEveryTime: (...args: any[]) => void)
{
    return (target: any, key: string, descriptor: any) => 
    {
        var originalMethod = descriptor.value; 

        descriptor.value =  function (...args: any[]) {
            funcToCallEveryTime(...args);
            return originalMethod.apply(target, args);
        }

        return descriptor;
    }
}