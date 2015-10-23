# JsonExPatcher
Patches JsonEx to allow MV plugins with module names to be serialized

## How to use
If your class needs an special name, just add to the function a property called serializeName:

    var Class = function () {};
    Class.serielizeName = 'Class';
    
If your class is inside a module, you can add the full name by adding '.' between module parts:

    Class.Inside = function () {};
    Class.Inside.serializeName = "Class.Inside";
    
## How to install
This doesn't work default behaviour, but because the methods are overriten, please, put this as your first plugin loaded.
