<script>
import { NuxtLink } from '#components';

</script>
<template>
    <nav id="sidebar">
        <div class="sidebar-header">
            <img src="assets/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">
        </div>
        <ul class="list-unstyled components text-secondary">
            <li>
                <NuxtLink to="/"><i class="fas fa-home"></i>Dashboard</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/employees"><i class="fas fas fa-user-friends"></i>Quản lý tài xế</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ctvs"><i class="fas fas fa-user-friends"></i>Quản lý CTV</NuxtLink>
            </li>
            <li>
                <a href="tables.html"><i class="fas fa-table"></i>Bảng giá</a>
            </li>
            <li>
                <NuxtLink to="/cities"><i class="fas fa-table"></i>Tỉnh thành</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/wallets"><i class="fas fa-money-bill"></i>Ví tiền</NuxtLink>
                
            </li>
            <li>
                <a href="icons.html"><i class="fas fa-money-bill-transfer"></i>Quản lý giao dịch</a>
            </li>
            <li>
                <a href="#uielementsmenu" data-bs-toggle="collapse" aria-expanded="true"
                    class="dropdown-toggle no-caret-down"><i class="fas fa-money-bill-transfer"></i>Quản lý lệnh rút
                    tiền</a>
                <ul class="list-unstyled" id="uielementsmenu">
                    <li>
                        <a href="ui-buttons.html"><i class="fas fa-angle-right"></i>Lệnh chờ</a>
                    </li>
                    <li>
                        <a href="ui-badges.html"><i class="fas fa-angle-right"></i>Hoàn thành</a>
                    </li>
                    <li>
                        <a href="ui-cards.html"><i class="fas fa-angle-right"></i>Hủy yêu cầu</a>
                    </li>

                </ul>
            </li>
            <li>
                <a href="#uielementsmenu" data-bs-toggle="collapse" aria-expanded="true"
                    class="dropdown-toggle no-caret-down"><i class="fas fa-plane"></i>Quản lý chuyến đi</a>
                <ul class="list-unstyled" id="uielementsmenu">
                    <li>
                        <a href="ui-buttons.html"><i class="fas fa-angle-right"></i>Chờ tài xế</a>
                    </li>
                    <li>
                        <a href="ui-badges.html"><i class="fas fa-angle-right"></i>Đã nhận đơn</a>
                    </li>
                    <li>
                        <a href="ui-cards.html"><i class="fas fa-angle-right"></i>Hoàn thành</a>
                    </li>
                    <li>
                        <a href="ui-cards.html"><i class="fas fa-angle-right"></i>Lệnh hủy chuyến</a>
                    </li>

                </ul>
            </li>
            <li>
                <a href="tables.html"><i class="fas fa-table"></i>Giá sàn</a>
            </li>
            <li>
                <a href="tables.html"><i class="fas fa-table"></i>Phụ phí</a>
            </li>
            <li>
                <a href="/transport_systems"><i class="fas fa-car"></i>Quản lý hãng xe</a>
            </li>

            <li>
                <a href="settings.html"><i class="fas fa-sign-out-alt"></i>Đăng xuất</a>
            </li>
        </ul>
    </nav>
</template>