using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class APIContext : DbContext
    {
        public APIContext()
        {
        }

        public APIContext(DbContextOptions<APIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<BillDetailBan> BillDetailBan { get; set; }
        public virtual DbSet<BillDetailNhap> BillDetailNhap { get; set; }
        public virtual DbSet<BillsBan> BillsBan { get; set; }
        public virtual DbSet<BillsNhap> BillsNhap { get; set; }
        public virtual DbSet<Donhang> Donhang { get; set; }
        public virtual DbSet<KhachHang> KhachHang { get; set; }
        public virtual DbSet<LoaiSp> LoaiSp { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<NhaCungCap> NhaCungCap { get; set; }
        public virtual DbSet<SanPham> SanPham { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=LAPTOP-LLHPT87U\\SQLEXPRESS;Database=API;Trusted_Connection=True;Encrypt=False;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.MaTaiKhoan);

                entity.ToTable("account");

                entity.Property(e => e.LoaiQuyen)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MaNguoiDung)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.MatKhau)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NgayBatDau).HasColumnType("datetime");

                entity.Property(e => e.NgayKetThuc).HasColumnType("datetime");

                entity.Property(e => e.TaiKhoan)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.MaNguoiDungNavigation)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.MaNguoiDung)
                    .HasConstraintName("FK_account_users");
            });

            modelBuilder.Entity<BillDetailBan>(entity =>
            {
                entity.ToTable("bill_detail_ban");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Chietkhau)
                    .HasColumnName("chietkhau")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdBillBan)
                    .IsRequired()
                    .HasColumnName("id_bill_ban")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.IdKh)
                    .IsRequired()
                    .HasColumnName("id_kh")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Masp)
                    .IsRequired()
                    .HasColumnName("masp")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Soluong).HasColumnName("soluong");

                entity.Property(e => e.Tongtien).HasColumnName("tongtien");

                entity.Property(e => e.Tralai).HasColumnName("tralai");
            });

            modelBuilder.Entity<BillDetailNhap>(entity =>
            {
                entity.ToTable("bill_detail_nhap");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("date");

                entity.Property(e => e.DonVi)
                    .IsRequired()
                    .HasColumnName("don_vi")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.IdBillNhap)
                    .IsRequired()
                    .HasColumnName("id_bill_nhap")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.IdSp)
                    .IsRequired()
                    .HasColumnName("id_sp")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Sl).HasColumnName("sl");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("date");

                entity.HasOne(d => d.IdBillNhapNavigation)
                    .WithMany(p => p.BillDetailNhap)
                    .HasForeignKey(d => d.IdBillNhap)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_bill_detail_nhap_bills_nhap");
            });

            modelBuilder.Entity<BillsBan>(entity =>
            {
                entity.ToTable("bills_ban");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ghichu)
                    .HasColumnName("ghichu")
                    .HasMaxLength(500);

                entity.Property(e => e.IdKh)
                    .HasColumnName("id_kh")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.NgayBan)
                    .HasColumnName("ngay_ban")
                    .HasColumnType("datetime");

                entity.Property(e => e.TenKh)
                    .IsRequired()
                    .HasColumnName("ten_kh")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.TongTien).HasColumnName("tong_tien");

                entity.Property(e => e.Trangthai)
                    .IsRequired()
                    .HasColumnName("trangthai")
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<BillsNhap>(entity =>
            {
                entity.ToTable("bills_nhap");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("date");

                entity.Property(e => e.DateOrder)
                    .HasColumnName("date_order")
                    .HasColumnType("date");

                entity.Property(e => e.IdNcc)
                    .HasColumnName("id_ncc")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.IdNhanvien)
                    .IsRequired()
                    .HasColumnName("id_nhanvien")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Note)
                    .HasColumnName("note")
                    .HasMaxLength(500);

                entity.Property(e => e.ThanhToan)
                    .HasColumnName("thanh_toan")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.TongTien).HasColumnName("tong_tien");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<Donhang>(entity =>
            {
                entity.HasKey(e => e.MaDonHang);

                entity.Property(e => e.MaDonHang)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.MaKhachHang)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Ngaydat).HasColumnType("datetime");

                entity.Property(e => e.Trangthai).HasMaxLength(50);
            });

            modelBuilder.Entity<KhachHang>(entity =>
            {
                entity.ToTable("khach_hang");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.DiaChi)
                    .IsRequired()
                    .HasColumnName("dia_chi")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Note)
                    .HasColumnName("note")
                    .HasColumnType("text");

                entity.Property(e => e.Sdt)
                    .IsRequired()
                    .HasColumnName("sdt")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TenKh)
                    .IsRequired()
                    .HasColumnName("ten_kh")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LoaiSp>(entity =>
            {
                entity.ToTable("loai_sp");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Tenloai)
                    .HasColumnName("tenloai")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("news");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content")
                    .HasMaxLength(1000);

                entity.Property(e => e.IdNew)
                    .IsRequired()
                    .HasColumnName("id_new")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Image)
                    .IsRequired()
                    .HasColumnName("image")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<NhaCungCap>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("nha_cung_cap");

                entity.Property(e => e.DiachiNcc)
                    .IsRequired()
                    .HasColumnName("diachi_ncc")
                    .HasMaxLength(200);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Sdt)
                    .IsRequired()
                    .HasColumnName("sdt")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.TenNcc)
                    .IsRequired()
                    .HasColumnName("ten_ncc")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<SanPham>(entity =>
            {
                entity.ToTable("san_pham");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.DonViTinh)
                    .HasColumnName("don_vi_tinh")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdLoaiSp)
                    .HasColumnName("id_loai_sp")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.IdNcc)
                    .IsRequired()
                    .HasColumnName("id_ncc")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MotaSp)
                    .HasColumnName("mota_sp")
                    .HasMaxLength(250);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(100);

                entity.Property(e => e.SoLuong).HasColumnName("so_luong");

                entity.Property(e => e.UnitPrice).HasColumnName("unit_price");

                entity.HasOne(d => d.IdLoaiSpNavigation)
                    .WithMany(p => p.SanPham)
                    .HasForeignKey(d => d.IdLoaiSp)
                    .HasConstraintName("FK_san_pham_loai_sp");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("full_name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
