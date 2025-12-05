import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const loginLogs = [
    { id: 1, user: "张三", ip: "192.168.1.1", location: "北京", time: "2024-03-20 10:30:00", status: "成功" },
    { id: 2, user: "李四", ip: "192.168.1.2", location: "上海", time: "2024-03-20 10:25:00", status: "成功" },
    { id: 3, user: "王五", ip: "192.168.1.3", location: "广州", time: "2024-03-20 10:20:00", status: "失败" },
    { id: 4, user: "赵六", ip: "192.168.1.4", location: "深圳", time: "2024-03-20 10:15:00", status: "成功" },
    { id: 5, user: "管理员", ip: "192.168.1.5", location: "杭州", time: "2024-03-20 10:10:00", status: "成功" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">工作台</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>系统公告</CardTitle>
            <CardDescription>
              请仔细阅读以下重要通知，这些内容关乎您的日常工作流程和系统安全。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                尊敬的用户，系统将于本周六凌晨 2:00 进行例行维护，预计耗时 2 小时。
                在此期间，后台管理系统将暂停服务，请提前做好数据保存工作。
                我们将对数据库进行优化，并修复上周反馈的几个已知问题。
              </p>
              <p>
                另外，新的权限管理模块已上线测试。
                该模块引入了更细粒度的角色控制，支持按部门和职位分配数据访问权限。
                如果您在使用过程中遇到任何问题，或有任何改进建议，请通过工单系统反馈给技术团队。
              </p>
              <p>
                为了加强账户安全，我们建议所有管理员开启双因素认证 (2FA)。
                您可以在“个人设置”页面找到相关选项。感谢您的配合！
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>快速概览</CardTitle>
            <CardDescription>本月关键数据指标</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">总用户数</p>
                  <p className="text-sm text-muted-foreground">
                    较上月增长 +20.1%
                  </p>
                </div>
                <div className="ml-auto font-medium">1,234</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">活跃用户</p>
                  <p className="text-sm text-muted-foreground">
                    较上月增长 +10.5%
                  </p>
                </div>
                <div className="ml-auto font-medium">890</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">系统负载</p>
                  <p className="text-sm text-muted-foreground">
                    运行状态良好
                  </p>
                </div>
                <div className="ml-auto font-medium">24%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近登录日志</CardTitle>
          <CardDescription>
            查看最近系统的访问记录，这在宽屏模式下查看效果更佳。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户</TableHead>
                <TableHead>IP 地址</TableHead>
                <TableHead>登录地点</TableHead>
                <TableHead>登录时间</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.time}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "成功" ? "default" : "destructive"}>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
