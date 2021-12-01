Quy tắc sử dụng các Branch trên Git và cách đánh version
1. Git branches
Thống nhất sử dụng các branches như sau, với tác dụng như mô tả:

* production
Đây là branch chính của tất cả các repository → code ở trên branch này là code đã ở trạng thái Production-ready.

Các developers không thể tự ý push code lên branch này, mà buộc phải thông qua Pull request từ các branches khác.
Branch sẽ được tự động build và test qua hệ thống → nếu build và test failed thì developers cần có trách nhiệm khắc phục càng sớm càng tốt.
Code trên branch master sẽ được release lên các server sit, uat, production qua cách đánh Tag tương ứng.
* develop
Đây là branch cho công việc phát triển code → tất cả các code của các branches khác sẽ ở nhánh này!
Các developers cũng nên hạn chế code trực tiếp trên branch develop nếu không cần thiết

* pre-release
 Đây là branch sẽ được đẩy lên sau khi đã hoàn thành hết các chức năng, nó được coi là test merge
* các branches khác
 Các branch khác sẽ được đặt tên với các nguyên tắc sau:
  + Tên branch sẽ được đặt tên bằng tiếng anh hoặc bằng tiếng việt không dấu
  + Tên các branch cách nhau bằng dấu '_'
  + Tên được đặt theo tên chức năng mà pyc đang làm
