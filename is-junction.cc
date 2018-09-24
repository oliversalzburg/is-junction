#include <node.h>
#include <windows.h>

void isJunction(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();

  if (!args[0]->IsString()) {
    isolate->ThrowException(v8::Exception::TypeError(
          v8::String::NewFromUtf8(isolate, "Argument must be a string")));
    return;
  }

  //auto path = args[0]->ToString();
  std::string path(*v8::String::Utf8Value(args[0]->ToString()));

  WIN32_FIND_DATA FindFileData;
  HANDLE hFind;

  hFind = FindFirstFile(path.c_str(), &FindFileData);
  if (hFind == INVALID_HANDLE_VALUE) {
    isolate->ThrowException(
      node::WinapiErrnoException(
        isolate,
        ERROR_BAD_PATHNAME,
        "FindFirstFile",
        NULL,
        path.c_str()
      ) );
    return;
  }

  bool flagsIndicateJunction = 
    FindFileData.dwFileAttributes & FILE_ATTRIBUTE_REPARSE_POINT &&
    FindFileData.dwReserved0 == IO_REPARSE_TAG_MOUNT_POINT;

  args.GetReturnValue().Set(flagsIndicateJunction);
  FindClose(hFind);
}

void Initialize(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "isJunction", isJunction);
}

NODE_MODULE(module_name, Initialize)