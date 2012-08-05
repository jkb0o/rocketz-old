from construct import *

mappings = {}
definitions = {}

def message(name, *args):
    msg_id = len(mappings) + 1
    mappings[name] = msg_id
    definitions[name] = Struct(name, *args)


message("obj_created",
    UBInt16("id"),
    Flag("static"),
    Array(2, BFloat32("center")),
    BFloat32("angle"),
    Enum(Byte("shape_type"), poly=1, circle=2),
    Switch("shape_options", lambda c: c.shape_type, dict(
        poly = PrefixedArray(
            Array(2, BFloat32("point")),
            UBInt8("length")
        ),
        circle = BFloat32("radius")
    ))
)

message("obj_removed",
    UBInt16("obj")
)

message("move",
    UBInt16("obj"),
    Array(2, BFloat32("pos")),
    Array(2, BFloat32("vel")),
    BFloat32("rot"),
    BFloat32("avel")
)

message("world_info",
    Sequence("lower_bound", BFloat32("x"), BFloat32("y")),
    Sequence("upper_bound", BFloat32("x"), BFloat32("y")),
)

message("identify",
    UBInt16("obj")
)


